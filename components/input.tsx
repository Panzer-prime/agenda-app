import React, { SetStateAction } from "react";
import Swal from "sweetalert2";
import { createContact } from "@/lib/utils/createContactc";
import { validatePhoneNumber } from "@/lib/definitions/signFormSchema";
import Plus from "@/public/plus.svg";
import Image from "next/image";

interface InputProps {
  className?: string;
  setFlag: React.Dispatch<SetStateAction<boolean>>;
}

export const InputSearch: React.FC<InputProps> = ({ className, setFlag }) => {
  const handleCreateContact = async () => {
    const result = await Swal.fire({
      title: "Create Contact",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Phone number" type="tel"/>
        <input id="swal-input2" class="swal2-input" placeholder="Contact Name" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const phoneNumber = (
          document.getElementById("swal-input1") as HTMLInputElement
        ).value;
        const contactName = (
          document.getElementById("swal-input2") as HTMLInputElement
        ).value;

        if (!phoneNumber || !contactName) {
          Swal.showValidationMessage("Please enter both fields.");
          return false;
        }

        const validateErrors = validatePhoneNumber(phoneNumber);
        if (validateErrors) {
          Swal.showValidationMessage(validateErrors.join(", "));
          return false;
        }

        return { phoneNumber, contactName };
      },
      showCancelButton: true,
      confirmButtonText: "Create",
    });

    if (result.isConfirmed) {
      const { phoneNumber, contactName } = result.value;
      try {
        await createContact(phoneNumber, contactName);
        Swal.fire("Success", "Contact created successfully!", "success");
        setFlag((prev) => !prev);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "Failed to create contact", "error");
      }
    }
  };

  return (
      <button
        onClick={handleCreateContact}
        className="w-11 h-11 bg-teal-700 flex justify-center items-center rounded-md"
      >
        <Image src={Plus} width={30} height={30} alt="plus icon" />
      </button>
  );
};
