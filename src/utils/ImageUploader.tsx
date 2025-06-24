import { useState } from "react";

const ImageUploader = () => {
    const [isUploading, setIsUploading] = useState(false);

    const uploadImagesToCloudinary = async (
        selectedFiles: File | File[],
        multiple = false
    ) => {
        const files = Array.isArray(selectedFiles)
            ? selectedFiles
            : [selectedFiles];

        if (!selectedFiles || files?.length === 0) {
            return multiple ? [] : "";
        }

        setIsUploading(true);
        const cloudinaryUrls: string[] = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "restaurant");

            try {
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    { method: "POST", body: formData }
                );

                const data = await res.json();
                if (data.secure_url) {
                    cloudinaryUrls.push(data.secure_url);
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                console.log("Image upload failed, please try again.");
            }
        }

        setIsUploading(false);
        return multiple ? cloudinaryUrls : cloudinaryUrls[0];
    };

    return { uploadImagesToCloudinary, isUploading };
};

export default ImageUploader;