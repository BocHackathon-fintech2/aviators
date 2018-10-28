import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Name } from '../model/name/name.model';

@Injectable()
export class NameListService {
 
    private noteListRef = this.db.list<Name>('name');
 
    constructor(private db: AngularFireDatabase) { }
 
    getNoteList() {
        var x = this.noteListRef;
        return x
    }
 
    addNote(note: Name) {
        return this.noteListRef.push(note);
    }
 
    updateNote(note: Name) {
        return this.noteListRef.update(note.key, note);
    }
 
    removeNote(note: Name) {
        return this.noteListRef.remove(note.key);
    }
}