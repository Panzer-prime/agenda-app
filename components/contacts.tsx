import { useState } from "react";
import Swal from "sweetalert2";
import { validatePhoneNumber } from "@/lib/definitions/signFormSchema";
import { editContacts } from "@/lib/utils/editContact";
import Image from "next/image";
import Trash from "@/public/Trash.svg";
import Edit from "@/public/Edit_fill.svg";

interface ContactProps {
  id: number;
  name?: string;
  numar?: string;
  handleDelete: (id: number) => void;
}

export const Contact: React.FC<ContactProps> = ({
  id,
  name: initialName,
  numar: initialNumar,
  handleDelete,
}) => {
  const [name, setName] = useState(initialName || "N/A");
  const [numar, setNumar] = useState(initialNumar || "N/A");

  const handleEditTask = async () => {
    const { value: formValues, isConfirmed } = await Swal.fire({
      title: "Edit contact",
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="${name}">
        <input type="text" id="phone" class="swal2-input" placeholder="${numar}">
      `,
      focusCancel: false,
      preConfirm: () => {
        const contactName = (
          document.getElementById("name") as HTMLInputElement
        ).value;
        const phoneNumber = (
          document.getElementById("phone") as HTMLInputElement
        ).value;

        if (!contactName && !phoneNumber) {
          Swal.showValidationMessage("Please add at least one field");
          return null;
        }

        if (phoneNumber) {
          const validationErrors = validatePhoneNumber(phoneNumber);
          if (validationErrors) {
            Swal.showValidationMessage(validationErrors.join(", "));
            return null;
          }
        }

        return { contactName, phoneNumber };
      },
      showCancelButton: true,
    });

    if (isConfirmed && formValues) {
      const { contactName, phoneNumber } = formValues;
      try {
        await editContacts({ id, savedName: contactName, phone: phoneNumber });

        // Update local state after successful edit
        if (contactName) setName(contactName);
        if (phoneNumber) setNumar(phoneNumber);

        Swal.fire("Success", "Contact edited successfully", "success");
      } catch (error: any) {
        console.log(error.message);
        Swal.fire("Error", `${error.message}`, "error");
      }
    }
  };

  const handleCall = () => {
   Swal.fire("Doesn't work yet", "sry", "error") 
  }

  
  return (
    <div className="flex flex-row justify-between bg-[#ED9455] p-3 rounded-md">
      <p className="text-sky-600 font-bold">{name}</p>
      <p className="text-sky-600 font-bold">{numar}</p>
      <button className="bg-red-600  rounded-md text-white font-semibold px-3" onClick={handleCall}>
        Call
      </button>
      <button onClick={() => handleDelete(id)} className="text-red-600">
        <Image src={Trash} width={30} height={30} alt="trash icon" />
      </button>
      <button onClick={handleEditTask} className="text-blue-600">
        <Image src={Edit} width={30} height={30} alt="edit icon" />
      </button>
    </div>
  );
};
