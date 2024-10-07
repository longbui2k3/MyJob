import { FaQuoteLeft } from "react-icons/fa";
import { Heading3, Heading6 } from "../headings";
import StarRating from "./StarRating";
import { Text } from "../text";
import { DEFAULT_PADDING_X } from "../../helpers/constants";

export default function ClientsTestimonial() {
  return (
    <div
      className={`w-full bg-[--gray-100]`}
      style={{
        padding: `80px ${DEFAULT_PADDING_X}`,
      }}
    >
      <div className="flex justify-center w-full">
        <div>
          <Heading3 name="Client Testimonial" className="text-center" />
          <div className="flex justify-between mt-10 space-x-4">
            {new Array(3).fill(0).map((val) => (
              <div className="p-4 bg-white rounded-lg">
                <div className="h-[150px]">
                  <StarRating />
                  <Text
                    children={`"Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est."`}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <img
                      src="./avatar.png"
                      width="40"
                      className="rounded-full"
                    />
                    <div>
                      <Heading6 name="Long Bui" />
                      <Text
                        children="UI-UX Designer"
                        className="mt-[0px] font-[12px]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <FaQuoteLeft size={"30"} color="var(--gray-200)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
