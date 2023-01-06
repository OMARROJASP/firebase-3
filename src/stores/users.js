import {defineStore} from "pinia";
import {auth} from "../firebaseConfig.js";
import {
    createUserWithEmailAndPassword, onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"
import {useDatabaseStore} from "./database.js";
import router from "../router.js";


export const useUserStore = defineStore("user",{
    state: ()=>({
        userData:null,
        loadingUser : false,
        loadingSession: false,
    }),
    actions: {
        async registerUser (email, password){
            this.loadingUser = true
             try{
                 const {user} = await createUserWithEmailAndPassword(auth, email, password);
                 this.userData = {email: user.email, uid: user.uid}
                 router.push("/")
             }catch (e){
                 console.log(e);
             }finally {
                 this.loadingUser = false
             }
        },

        async loginUser(email, password){
            this.loadingUser = true
            try{
                const {user} = await signInWithEmailAndPassword (auth, email, password);
                this.userData = {email: user.email, uid: user.uid}
                router.push("/")
            }catch (e){
                console.log(e);
            }finally {
                this.loadingUser = false
            }
        },

        async signOutUser(){
            this.loadingSession = true
            const databaseStore = useDatabaseStore()
            try {
                await signOut(auth)
                this.userData = {};
                router.push("/login")
            }catch (e) {
                console.log(e)
            }finally {
                this.loadingSession = false
               databaseStore.$reset()
            }
        },

        currentUser(){
            return new Promise((resolve, reject) => {
                const unsubcribe = onAuthStateChanged(
                    auth, (user) =>{
                        const databaseStore = useDatabaseStore()
                        if(user) {
                            this.userData = {
                                email: user.email,
                                uid: user.uid,
                            };
                        }else{
                            this.userData = null;
                            databaseStore.$reset();
                        }
                        resolve(user)
                },
                    (e) => reject(e)
                );
                unsubcribe();
            });
        },


    }
})