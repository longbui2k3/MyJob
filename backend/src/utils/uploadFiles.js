const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getMetadata,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebase.config");
initializeApp(firebaseConfig);
const storage = getStorage();
class UploadFiles {
  constructor(model, type, file) {
    this.file = file;
    this.type = type; // image or video
    this.model = model;
  }
  async uploadFileAndDownloadURL() {
    if (this.file?.mimetype && this.file?.buffer) {
      const storageRef = ref(
        storage,
        `${this.model.toLowerCase()}/${this.type.toLowerCase()}/${Date.now()}`
      );
      const metadata = {
        contentType: this.file.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        this.file.buffer,
        metadata
      );

      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    }
    return undefined;
  }

  static async getFileInfo(fileUrl) {
    const storageRef = ref(storage, fileUrl);
    return await getMetadata(storageRef);
  }
}

module.exports = UploadFiles;
