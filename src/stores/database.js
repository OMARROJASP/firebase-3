import {addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where } from "firebase/firestore/lite"
import {db,auth} from "../firebaseConfig.js"
import {defineStore} from "pinia";
import router from "../router";


export const useDatabaseStore = defineStore("database", {
    state: () => ({
        documents : [],
        loadingDoc: false,

    }),

    actions: {

        async getUrls() {
            if (this.documents.length !== 0) {
                return;
            }

            this.loadingDoc = true;
            try {
                const q = query(
                    collection(db, "urls"), where("user", "==", auth.currentUser.uid) // es un objeto
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    this.documents.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
            } catch (error) {
                console.log(error);
            } finally {
                this.loadingDoc = false;
            }

        },


        async addUrl(name, short){
            this.loadingDoc = true;
            try {
                const docObject = {
                    name: name,
                    short: short,
                    user: auth.currentUser.uid
                };

                const q = query(collection(db, "urls"))
                const docRef = await addDoc(q,docObject);
                this.documents.push({
                    id: docRef.id,
                    ...docObject
                }
            )

            }catch (e){
                console.log(e)
            }finally {
                this.loadingDoc = false;
            }
        },

        async deleteUrl(id){
            this.loadingDoc = true;



            try {
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);

                if(!docSnap.exists()){
                    throw new Error('no exist document')
                }

                if(docSnap.data().user === auth.currentUser.uid){
                    await deleteDoc(docRef);
                    this.documents = this.documents.filter((item) => item.id !== id);
                }else{
                    throw new Error('no exist actor')
                }

            }catch (error) {
                console.log(error.message);
            } finally {
                this.loadingDoc = false;
            }
        },

        async leerUrl(id) {
            this.loadingDoc = true;
            try {
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    throw new Error("no existe el doc");
                }

                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("no le pertenece ese documento");
                }

                return docSnap.data().name;
            } catch (error) {
                console.log(error.message);
            } finally {
                this.loadingDoc = false;
            }
        },

        async updateUrl(id, name){
            this.loadingDoc = true;
            try {
                const docRef  = doc(db,"urls", id);
                const docSnap = await getDoc(docRef);

                if(!docSnap.exists()){
                    throw new Error("We not find your document")
                }

                if(docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("This document does not belong to you")
                }

                await updateDoc(docRef,{
                    name: name
                })

                this.documents = this.documents.map((item) =>
                    item.id === id ? { ...item, name: name } : item
                );
                router.push("/");

            }catch (error) {
                console.log(error.message);
            }finally {
                this.loadingDoc = false;
            }
        }



        }
})
