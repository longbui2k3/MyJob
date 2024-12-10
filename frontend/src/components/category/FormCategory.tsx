import { useEffect, useState } from "react";
import { ButtonSubmit } from "../buttons";
import { MessageError, MessageSuccess, OutsideForm } from "../global";
import { CategoryNameInput, useCategoryNameInput } from "../inputs";
import { FileInput, useFileInput } from "../inputs/FileInput";
import {
  CreateCategoryAPI,
  FindCategoryAPI,
  UpdateCategoryAPI,
} from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { closeFormCategory, setDataChange } from "../../features";
import { toastError, toastSuccess } from "../toast";

export default function FormCategory() {
  const type = useSelector((state: any) => state.openForm.type);
  const id = useSelector((state: any) => state.openForm.id);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const defaultMessage = {
    isShow: false,
    type: "error",
    message: "",
  };
  const [message, setMessage] = useState(defaultMessage);
  const {
    inputCategoryName,
    setInputCategoryName,
    handleInputCategoryName,
    isEmptyCategoryName,
  } = useCategoryNameInput({ defaultValue: "" });
  const {
    imageUrl: categoryImageUrl,
    setImageUrl: setCategoryImageUrl,
    handleFileChange: handleImageFileChange,
    file: fileImage,
  } = useFileInput();
  const {
    imageUrl: categoryIconUrl,
    setImageUrl: setCategoryIconUrl,
    handleFileChange: handleIconFileChange,
    file: fileIcon,
  } = useFileInput();

  async function createCategory() {
    setIsLoading(true);
    const data = await CreateCategoryAPI({
      name: inputCategoryName,
      imageUrl: fileImage,
      iconUrl: fileIcon,
    });
    if (data.isSuccess) {
      toastSuccess(data.message);
      setMessage({
        isShow: true,
        type: "success",
        message: data.message,
      });
      dispatch(closeFormCategory());
      dispatch(setDataChange());
    } else {
      toastError(data.message);
      setMessage({
        isShow: true,
        type: "error",
        message: data.message,
      });
    }
    setIsLoading(false);
  }

  async function updateCategory() {
    if (!id) return;
    setIsLoading(true);
    const data = await UpdateCategoryAPI(id, {
      name: inputCategoryName,
      imageUrl: fileImage,
      iconUrl: fileIcon,
    });
    if (data.isSuccess) {
      toastSuccess(data.message);
      setMessage({
        isShow: true,
        type: "success",
        message: data.message,
      });
      dispatch(closeFormCategory());
      dispatch(setDataChange());
    } else {
      toastError(data.message);
      setMessage({
        isShow: true,
        type: "error",
        message: data.message,
      });
    }
    setIsLoading(false);
  }

  async function findCategoryById(id: string) {
    const data = await FindCategoryAPI(id);
    if (data.isSuccess) {
      setInputCategoryName(data.metadata.category.name);
      setCategoryIconUrl(data.metadata.category.iconUrl);
      setCategoryImageUrl(data.metadata.category.imageUrl);
    }
  }

  useEffect(() => {
    if (type === "update") findCategoryById(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "create") {
      await createCategory();
    } else if (type === "update") {
      await updateCategory();
    }
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
