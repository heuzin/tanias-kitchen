import { inject, Injectable, signal } from '@angular/core';
import {
  collection,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { UserFirestore } from '../models/user.firestore.model';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class UserFirestoreService {
  private firestore = inject(Firestore);
  private loaderService = inject(LoaderService);
  usersCollection = collection(
    this.firestore,
    'users'
  ) as CollectionReference<UserFirestore>;

  private users = signal<UserFirestore[]>([]);
  allUsers = this.users.asReadonly();

  async getAllUsers() {
    this.loaderService.showLoader();
    const snapshot = await getDocs(this.usersCollection);
    this.users.set([...snapshot.docs.map((document) => document.data())]);
    this.loaderService.hideLoader();
  }

  async getUser(userId: string) {
    this.loaderService.showLoader();
    const docRef = doc(this.firestore, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as UserFirestore;
  }

  async addUser(user: UserFirestore) {
    const ref = doc(this.firestore, 'users', user.localId);
    await setDoc(ref, user);
  }

  async updateUser(user: UserFirestore) {
    const ref = doc(this.firestore, 'users', user.localId);
    await updateDoc(ref, {
      ...user,
    });
  }
}
