// Service para subir archivos a Cloudinary (cliente unsigned)
// CONFIGURE: reemplaza estos valores por los tuyos
const CLOUDINARY_CLOUD = 'YOUR_CLOUD_NAME'
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET'

function ensureConfigured() {
  if (!CLOUDINARY_CLOUD || CLOUDINARY_CLOUD === 'YOUR_CLOUD_NAME') {
    throw new Error('Cloudinary no configurado. Rellena CLOUDINARY_CLOUD y CLOUDINARY_UPLOAD_PRESET en src/Service/uploadService.js')
  }
}

export function uploadToCloudinaryWithProgress(file, onProgress, folder = '') {
  ensureConfigured()
  return new Promise((resolve, reject) => {
    try {
      const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/upload`
      const fd = new FormData()
      fd.append('file', file)
      fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      if (folder) fd.append('folder', folder)

      const xhr = new XMLHttpRequest()
      xhr.open('POST', url)

      xhr.upload.onprogress = function (e) {
        if (e.lengthComputable && typeof onProgress === 'function') {
          const percent = Math.round((e.loaded / e.total) * 100)
          try { onProgress(percent) } catch (err) { /* ignore */ }
        }
      }

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const json = JSON.parse(xhr.responseText || '{}')
            resolve(json.secure_url || json.url || json.public_id || json)
          } catch (err) {
            resolve(null)
          }
        } else {
          const message = `Cloudinary upload failed ${xhr.status} ${xhr.statusText} - ${xhr.responseText}`
          reject(new Error(message))
        }
      }

      xhr.onerror = function () {
        reject(new Error('Network error uploading to Cloudinary'))
      }

      xhr.send(fd)
    } catch (err) {
      reject(err)
    }
  })
}

export default { uploadToCloudinaryWithProgress }
