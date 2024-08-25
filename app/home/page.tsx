"use client";
import React, { useState, useEffect } from "react";
import { InputSearch } from "@/components/input";
import { deleteSession } from "@/lib/utils/session";
import { Contact } from "@/components/contacts";
import { fetchContacts } from "@/lib/utils/fetchContacts";
import { deleteContact } from "@/lib/utils/deleteContact";
import Image from "next/image";
import User from "@/public/user.svg";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface ContactProps {
  savedName: string;
  phone: string;
  id: number;
}

function Home() {
  const [reload, setReload] = useState(false);
  const [contacts, setContacts] = useState<ContactProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const fetchedContacts = await fetchContacts();
        if (!fetchedContacts) return;
        setContacts(fetchedContacts);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching contacts:", error.message);
      }
    };

    loadContacts();
  }, [reload]);

  const handleDelete = async (id: number) => {
    try {
      await deleteContact(id);

      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Are u sure u want to log out?",
      showConfirmButton: true,
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteSession();
        router.push("/login");
      }
    });
  };

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div className="w-dvw h-dvh flex flex-col bg-[#ECAB55] p-6 gap-y-9 md:h-4/5 md:w-4/5 rounded-lg">
        <div className="flex flex-row justify-between">
          <InputSearch setFlag={setReload} />
          <button
            className="w-11 h-11 bg-teal-700 flex justify-center items-center rounded-md"
            onClick={handleLogout}
          >
            <Image src={User} width={30} height={30} alt="User icon" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <Contact
                key={index}
                id={contact.id}
                handleDelete={handleDelete}
                name={contact.savedName}
                numar={contact.phone}
              />
            ))
          ) : (
            <p>No contacts saved</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
