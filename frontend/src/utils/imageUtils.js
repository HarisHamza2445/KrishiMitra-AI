/**
 * Compresses an image file using HTML5 Canvas.
 * @param {File} file - The image file to compress.
 * @param {number} maxWidth - Maximum width of the output image.
 * @param {number} maxHeight - Maximum height of the output image.
 * @param {number} quality - JPEG quality (0 to 1).
 * @returns {Promise<File>} - A promise that resolves with the compressed file.
 */
export const compressImage = async (file, maxWidth = 1024, maxHeight = 1024, quality = 0.7) => {
    return new Promise((resolve, reject) => {
        // Timeout after 3 seconds to avoid hanging
        const timeoutId = setTimeout(() => {
            reject(new Error('Compression timed out'));
        }, 3000);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                clearTimeout(timeoutId);
                let width = img.width;
                let height = img.height;

                // Maintain aspect ratio
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error('Canvas is empty'));
                            return;
                        }
                        const compressedFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });
                        resolve(compressedFile);
                    },
                    'image/jpeg',
                    quality
                );
            };
            img.onerror = (error) => {
                clearTimeout(timeoutId);
                reject(error);
            };
        };
        reader.onerror = (error) => {
            clearTimeout(timeoutId);
            reject(error);
        };
    });
};
