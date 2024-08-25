"use client";
import React, { useState, useEffect } from "react";
import { Contact } from "@/components/contacts";
import { fetchAllUsers } from "@/lib/utils/fetchAllUsers";
import Swal from "sweetalert2";
import { deleteSession } from "@/lib/utils/session";
import { deleteContact } from "@/lib/utils/deleteContact";
import Image from "next/image";
import User from "@/public/user.svg";

interface ContactProps {
  savedName: string;
  phone: string;
  id: number;
}

type userProps = {
  numar: string;
  prenume: string;
  nume: string;
  description: string;
  phoneNumbers: ContactProps[];
  userID: number;
};

function Admin() {
  const [users, setUsers] = useState<userProps[]>();

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const retrievedUsers = await fetchAllUsers();
        console.log(retrievedUsers);
        setUsers(retrievedUsers);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    loadContacts();
  }, []);

  const handleLogout = async () => {
    Swal.fire({
      title: "Are u sure u want to log out?",
      showConfirmButton: true,
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        deleteSession();
      }
    });
  };

  return (
    <div className="w-dvw h-dvh flex justify-center items-center ">
      <div className="flex flex-col gap-y-3 w-4/5 h-4/5 bg-[#ECAB55] p-4 rounded-md">
        <div className="flex flex-row justify-end p-3">
          <button
            className="w-11 h-11 bg-teal-700 flex justify-center items-center rounded-md"
            onClick={handleLogout}
          >
            <Image src={User} width={30} height={30} alt="User icon" />
          </button>
        </div>
        <div className="flex flex-col gap-y-4">
          {users?.map((user) => (
            <div key={user.userID} className="flex flex-col">
              <div className="flex flex-row gap-x-7 font-bold ">
                <p>
                  {user.nume} {user.prenume}
                </p>
                <p>{user.numar}</p>
              </div>
              <p className="font-semibold">{user.description}</p>
              <Contacts contacts={user.phoneNumbers} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;

type ContactListProps = {
  contacts: ContactProps[];
};

const Contacts: React.FC<ContactListProps> = ({
  contacts: initialContacts,
}) => {
  const [showContacts, setShowContacts] = useState(false);
  const [displayedContacts, setDisplayedContacts] =
    useState<ContactProps[]>(initialContacts);

  const handleDelete = async (id: number) => {
    try {
      await deleteContact(id);

      setDisplayedContacts(
        displayedContacts.filter((contact) => contact.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        onClick={(e) => setShowContacts((prev) => !prev)}
        className="bg-teal-600 p-2 rounded-md text-white font-semibold "
      >
        Show Contacts
      </button>
      <div className="flex flex-col gap-3 mt-4">
        {showContacts &&
          (displayedContacts.length > 0 ? (
            displayedContacts.map((contact) => (
              <Contact
                key={contact.id}
                id={contact.id}
                handleDelete={handleDelete}
                name={contact.savedName}
                numar={contact.phone}
              />
            ))
          ) : (
            <p className="w-full text-center bg-red-600 rounded-md p-3 font-bold text-white">
              No contacts saved for this user
            </p>
          ))}
      </div>
    </>
  );
};
