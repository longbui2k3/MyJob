import { useState } from "react";
import { ButtonSubmit } from "../buttons";
import { MessageError, MessageSuccess, OutsideForm } from "../global";
import { CategoryNameInput, useCategoryNameInput } from "../inputs";
import { FileInput, useFileInput } from "../inputs/FileInput";
import { CreateCategoryAPI } from "../../apis";
import { useDispatch } from "react-redux";
import { closeFormCategory } from "../../features";

export default function FormCategory() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const defaultMessage = {
    isShow: false,
    type: "error",
    message: "",
  };
  const [message, setMessage] = useState(defaultMessage);
  const { inputCategoryName, handleInputCategoryName, isEmptyCategoryName } =
    useCategoryNameInput({ defaultValue: "" });
  const {
    imageUrl: categoryImageUrl,
    handleFileChange: handleImageFileChange,
    file: fileImage,
  } = useFileInput();
  const {
    imageUrl: categoryIconUrl,
    handleFileChange: handleIconFileChange,
    file: fileIcon,
  } = useFileInput();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await CreateCategoryAPI({
      name: inputCategoryName,
      imageUrl: fileImage,
      iconUrl: fileIcon,
    });
    if (data.isSuccess) {
      setMessage({
        isShow: true,
        type: "success",
        message: data.message,
      });
      setTimeout(() => {
        dispatch(closeFormCategory());
      }, 1000);
    } else {
      setMessage({
        isShow: true,
        type: "error",
        message: data.message,
      });
    }
    setIsLoading(false);
  };
  return (
    <OutsideForm
      onSubmit={handleSubmit}
      height="75%"
      closeForm={closeFormCategory}
    >
      <>
        <CategoryNameInput
          value={inputCategoryName}
          onChange={handleInputCategoryName}
          isEmptyCategoryName={isEmptyCategoryName}
        />
        <FileInput
          title="Category Image"
          note="A photo larger than 400 pixels work best. Max photo size 5 MB."
          className="w-full text-gray-900"
          imageUrl={categoryImageUrl}
          onChange={handleImageFileChange}
        />

        <FileInput
          title="Category Icon"
          note="A photo larger than 400 pixels work best. Max photo size 5 MB."
          className="w-full text-gray-900"
          imageUrl={categoryIconUrl}
          onChange={handleIconFileChange}
        />
        <div className="flex flex-row-reverse">
          <ButtonSubmit
            label="Submit"
            isLoading={isLoading}
            className="w-[200px]"
          />
        </div>
        {message.isShow ? (
          message.type === "error" ? (
            <MessageError
              content={message.message}
              className="text-center mt-5"
            />
          ) : (
            <MessageSuccess
              content={message.message}
              className="text-center mt-5"
            />
          )
        ) : (
          ""
        )}
      </>
    </OutsideForm>
  );
}
