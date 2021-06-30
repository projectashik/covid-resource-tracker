import styles from "../../../styles/Form.module.css";
import Select from "react-select";
import { types } from "../../../data/types";
import { SyntheticEvent, useState } from "react";
import { ResourceType } from "../../../shared/types/ResourceType";
import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import NoSSR from "../../../components/NoSSR";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
export default function AddResouce({ user }: { user: UserProfile }) {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    country: "",
    state: "",
    city: "",
    postalCode: "",
    description: "",
    type: "",
    organization: "",
    addressOne: "",
    addressTwo: "",
    addedBy: {},
    contactEmail: "",
    contactNo: "",
  });

  const {
    country,
    state,
    city,
    postalCode,
    description,
    type,
    organization,
    addressOne,
    addressTwo,
    contactEmail,
    contactNo,
  } = values;

  const handleChange = (name: string) => (event: any) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleTypeChange = () => (event: any) => {
    console.log(event);
    setValues({ ...values, type: event.value });
  };

  const onSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    if (user) {
      try {
        await fetch("/api/POST/resource", {
          method: "POST",
          body: JSON.stringify({
            country,
            state,
            city,
            postalCode,
            addressOne,
            addressTwo,
            description,
            type,
            organization,
            contactEmail,
            contactNo,
            addedBy: {
              email: user.name,
            },
          }),
        });
        console.log("Created");
        setLoading(false);
        toast.success("Resource added successfully.");
        setValues({
          country: "",
          state: "",
          city: "",
          postalCode: "",
          description: "",
          type: "",
          organization: "",
          addressOne: "",
          addressTwo: "",
          contactEmail: "",
          addedBy: {},
          contactNo: "",
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Add Resource - Covid Resource Tracker</title>
      </Head>
      <div className="flex flex-col items-center">
        <Link href="/panel">
          <button className="bg-red-400 px-2 py-1">Go to Dashboard</button>
        </Link>
        <div className="flex flex-col items-center">
          <p className="capitalize font-bold text-4xl my-5 text-gray-900 border-b-4 border-dashed border-red-400">
            Add Resource
          </p>
          <form
            onSubmit={onSubmit}
            method="POST"
            className="bg-white rounded-md w-96 min-w-min shadow-md p-10"
          >
            <div className={styles.formGroup}>
              <label htmlFor="type" className={styles.formLabel}>
                Type
              </label>
              <NoSSR>
                <Select
                  required
                  options={types}
                  className={styles.formInput}
                  onChange={handleTypeChange()}
                ></Select>
              </NoSSR>
            </div>
            <div className={styles.formGroup + " my-4"}>
              <label htmlFor="organization" className={styles.formLabel}>
                Organization or person name
              </label>
              <input
                type="text"
                id="organization"
                required
                className={styles.formInput}
                onChange={handleChange("organization")}
                placeholder="Enter organization or person name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="country" className={styles.formLabel}>
                Country
              </label>
              <input
                type="text"
                id="country"
                required
                className={styles.formInput}
                onChange={handleChange("country")}
                placeholder="Enter country name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="state" className={styles.formLabel + " mt-4"}>
                State
              </label>
              <input
                type="text"
                id="state"
                required
                className={styles.formInput}
                onChange={handleChange("state")}
                placeholder="Enter state name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="city" className={styles.formLabel + " mt-4"}>
                City
              </label>
              <input
                type="text"
                required
                id="city"
                onChange={handleChange("city")}
                className={styles.formInput}
                placeholder="Enter city name"
              />
            </div>
            <div className={styles.formGroup}>
              <label
                htmlFor="postalCode"
                className={styles.formLabel + " mt-4"}
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                required
                onChange={handleChange("postalCode")}
                className={styles.formInput}
                placeholder="Enter postal code"
              />
            </div>
            <div className={styles.formGroup}>
              <label
                htmlFor="addressOne"
                className={styles.formLabel + " mt-4"}
              >
                Address
              </label>
              <input
                type="text"
                id="addressOne"
                required
                onChange={handleChange("addressOne")}
                className={styles.formInput}
                placeholder="Enter address"
              />
            </div>
            <div className={styles.formGroup}>
              <label
                htmlFor="addressTwo"
                className={styles.formLabel + " mt-4"}
              >
                Address Two
              </label>
              <input
                type="text"
                id="addressTwo"
                required
                onChange={handleChange("addressTwo")}
                className={styles.formInput}
                placeholder="Enter address two"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="contactNo" className={styles.formLabel + " mt-4"}>
                Contact No.
              </label>
              <input
                type="text"
                id="contactNo"
                required
                onChange={handleChange("contactNo")}
                className={styles.formInput}
                placeholder="Enter contact no."
              />
            </div>
            <div className={styles.formGroup}>
              <label
                htmlFor="contactEmail"
                className={styles.formLabel + " mt-4"}
              >
                Contact Email
              </label>
              <input
                type="text"
                id="contactEmail"
                required
                onChange={handleChange("contactEmail")}
                className={styles.formInput}
                placeholder="Enter contact email"
              />
            </div>
            <div className={styles.formGroup}>
              <label
                htmlFor="description"
                className={styles.formLabel + " mt-4"}
              >
                Description
              </label>
              <textarea
                id="description"
                required
                onChange={handleChange("description")}
                className={styles.formInput}
                placeholder="Description here"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-400 mt-4 block w-full text-white hover:bg-red-500 px-5 py-3"
            >
              {!loading ? "Add Resource" : "Adding"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
