import { Injectable } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class FotosService {
	private imgCropUrl = []
	constructor(
		private imagePicker: ImagePicker,
		private cropService: Crop,
		private file: File,
		private storage: AngularFireStorage,
		private http:HttpClient
	) { }
	escogerImagenes() {
		return this.imagePicker.hasReadPermission()
			.then((result) => {
				if (result == false) {
					// no callbacks required as this opens a popup which returns async    
					return this.imagePicker.requestReadPermission();
				}
				else {
					return this.imagePicker.getPictures({

						maximumImagesCount: 5,
						quality: 10
					})
				}
			})
			.then(async(results) => {
				this.imgCropUrl = []
				for (var i = 0; i < results.length; i++) {
					let cropS =await this.cropService.crop(results[i])
					let pros=await this.procesandoCrop(cropS)
					this.imgCropUrl.push(pros)
				}
				return this.imgCropUrl          
			})
	}
	procesandoCrop(imageData) {
		return new Promise((res,rej)=>{
			let urlimage: any
			this.file.resolveLocalFilesystemUrl(imageData)
				.then(newurlImage => {
					let dirpath = newurlImage.nativeURL
					let dirpathseg = dirpath.split("/")
					dirpathseg.pop()
					dirpath = dirpathseg.join('/')
					//alert(dirpath)
					urlimage = newurlImage
					return this.file.readAsArrayBuffer(dirpath, newurlImage.name)
				}).then(buffer => {
					//alert(buffer.byteLength)
					let blob = new Blob([buffer], { type: "image/jpg" })
	
					var reader = new FileReader();
					reader.readAsDataURL(blob);
					reader.onloadend = function () {
						res({
							base64: reader.result,
							url: urlimage.nativeURL,
							nombre: urlimage.name,
							blob: blob
	
						})
					}
				})
				.catch(err=>rej(err))
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
			).subscribe(()=>{},err=>reject(err))
			
		})
	}
	headers= new HttpHeaders()
	urlsaveImg="http://localhost/goodmeServe/public/usuarios/saveimg"
	subirimagen(foto:Blob,carpeta:string,index:string){
		//this.headers=this.headers.append('Content-Type', 'multipart/form-data')
		const formData = new FormData(); 
		formData.append('file', foto,'da.png'); 
		formData.append('dir', carpeta); 
		formData.append('aux', index); 


		console.log(formData.get('file'))
		return this.http.post(this.urlsaveImg,formData).toPromise()
	}
}
