import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Platform, AlertController } from '@ionic/angular';

//import firebase from 'firebase/app';


import { auth } from 'firebase';
import { Observable } from "rxjs/Observable";
@Injectable()
export class AuthFacebookProvider {
    constructor(private afAuth: AngularFireAuth, private fb: Facebook, private platform: Platform,
        public alertController: AlertController
    ) {

    }

    loginWithFacebook() {
        return Observable.create(observer => {
            if (this.platform.is('cordova')) {
                this.fb.login(['email', 'public_profile']).then(res => {
                    //alert(JSON.stringify(res))
                    const facebookCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                    console.log(res)
                    this.afAuth.auth.signInWithCredential(facebookCredential).then(user => {
                        observer.next(user);
                    }).catch(error => {
                        observer.error(error);
                    });
                }).catch((error) => {
                    observer.error(error);

                });
            } else {
                this.afAuth.auth
                    .signInWithPopup(new auth.FacebookAuthProvider())
                    .then((res) => {
                        observer.next(res);
                    }).catch(error => {
                        observer.error(error);
                    });
            }
        });
    }
    logout() {
        this.afAuth.auth.signOut();
        this.fb.logout()
            .then(() => {
                console.log("cerrando sesion de ios")
            })
    }
    veriduser() {
        return Promise.resolve(this.afAuth.auth.currentUser.uid)
    }
    veridusercompleto() {
        return Promise.resolve(this.afAuth.auth.currentUser)
    }
    facebookauth() {
        this.fb.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => {
                console.log('Logged into Facebook!', res)
                
                this.presentAlert(JSON.stringify(res))
            })
            .catch(e => {
                this.presentAlert(JSON.stringify(e))
                console.log('Error logging into Facebook', e)});


       // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    }
    async presentAlert(data) {
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: data,
            buttons: ['OK']
        });
    
        await alert.present();
    }
}
