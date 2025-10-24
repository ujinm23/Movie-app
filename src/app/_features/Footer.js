import { FilmIconWhite } from "../_icons/FilmIconWhite";
import { MailIcon } from "../_icons/MailIcon";
import { PhoneIcon } from "../_icons/PhoneIcon";

export function Footer() {
  return (
    <div className="w-screen h-[280px] bg-[#4338CA] text-[14px] flex justify-center">
      <div className="w-[1440px] h-[280px] flex justify-center items-center">
        <div className="w-[1280px] h-[200px] flex text-[#FAFAFA]  justify-between">
          <div className="w-[247px] h-[200px] flex flex-col gap-[12px]">
            <div className="flex items-center gap-[8px]">
              <FilmIconWhite />
              <p className=" text-[16px] italic font-bold">
                Movie Z
              </p>
            </div>
            <p className=" ">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>
          <div className="w-[147px] h-[200px]  flex flex-col gap-[12px]">
            <div>Contact Information</div>
            <div className="flex flex-col gap-[24px]">
              <div className="flex w-[174px] h-[40px] gap-[12px]">
                <MailIcon className="w-[16px] h-[16px]" />
                <div className="flex flex-col w-[146px] h-[40px]">
                  <p>Email:</p>
                  <p>support@movieZ.com</p>
                </div>
              </div>
              <div className="flex w-[174px] h-[40px] gap-[12px]">
                <PhoneIcon className="w-[16px] h-[16px]" />
                <div className="flex flex-col w-[146px] h-[40px]">
                  <p>Phone:</p>
                  <p>+976 (11) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[247px] h-[200px] gap-[12px] flex  flex-col">
            <p>Follow us </p>
            <div className="flex gap-[12px]"><p>Facebook</p><p>Instagram</p><p>Twitter</p><p>Youtube</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
