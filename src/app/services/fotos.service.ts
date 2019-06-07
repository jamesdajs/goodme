import { Injectable } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  imgCropUrl
  constructor(
    private imagePicker: ImagePicker,
    private cropService: Crop,
    private file: File,
    private storage: AngularFireStorage
  ) { }
  escogerImagenes() {
    this.imagePicker.hasReadPermission()
      .then((result) => {
        if (result == false) {
          // no callbacks required as this opens a popup which returns async    
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
          this.imagePicker.getPictures({

            maximumImagesCount: 5,
            quality: 10
          })
            .then(async (results) => {
              this.imgCropUrl = []
              for (var i = 0; i < results.length; i++) {

                let imageData = await this.cropService.crop(results[i])
                let objres = await this.procesandoCrop(imageData)
                this.imgCropUrl.push(objres)
              }
            })

        }
      })
      .catch(err => {
        alert(JSON.stringify(err))
      })
  }
  procesandoCrop(imageData) {
    return new Promise((res, rej) => {
      this.file.resolveLocalFilesystemUrl(imageData)
        .then(newurlImage => {
          let dirpath = newurlImage.nativeURL
          let dirpathseg = dirpath.split("/")
          dirpathseg.pop()
          dirpath = dirpathseg.join('/')
          //alert(dirpath)
          this.file.readAsArrayBuffer(dirpath, newurlImage.name)
            .then(buffer => {
              //alert(buffer.byteLength)
              let blob = new Blob([buffer], { type: "image/jpg" })

              var reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = function () {
                res({
                  base64: reader.result,
                  url: newurlImage.nativeURL,
                  nombre: newurlImage.name,
                  blob: blob
                })
              }
            })
        })
    })
  }
  getimagenesblob() {
    return this.imgCropUrl
  }
  uploadImageToFirebase(path, objres) {
    return new Promise((resolve, reject) => {
      //alert(newUrl)
      let ref = this.storage.ref(path + objres.nombre)
      let task = ref.put(objres.blob)
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(data => {
            //alert(data);
            resolve(data)
          })

        })
      ).subscribe()
    })
  }
}
