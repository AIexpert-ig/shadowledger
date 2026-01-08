// src/services/file.ts
export const FileService = {
    // Reads a File object and returns a Data URL string (base64)
    toBase64: (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const r = new FileReader()
        r.readAsDataURL(file)
        r.onload = () => resolve(r.result as string)
        r.onerror = err => reject(err)
      })
  }
  