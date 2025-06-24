import { Dispatch, SetStateAction } from "react";
import { File as FileIcon } from "lucide-react";

type TImageUpload = {
  setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
  setImagePreview?: Dispatch<SetStateAction<[] | string[]>>;
  imageFiles: File[] | [];
  label?: string;
  className?: string;
};

const RImageUploader = ({
  setImageFiles,
  setImagePreview,
  imageFiles,
}: TImageUpload) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFiles((prev) => [...prev, file]);

    if (setImagePreview) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }

    e.target.value = "";
  };

  return (
    <div className="flex justify-center items-center w-full gap-4">
      <input
        onChange={handleImageChange}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        id="image-uploader"
      />

      <label
        htmlFor="image-uploader"
        className="w-[400px] flex justify-center items-center gap-2 border-dashed cursor-pointer text-center border border-red-500 transition mt-3 py-2 text-red-500 hover:bg-red-50 rounded-full"
      >
        <FileIcon size={16} />
        {imageFiles?.length === 0 ? "Upload your image" : imageFiles[0].name}
      </label>
    </div>
  );
};

export default RImageUploader;
