import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const AddCamp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Add participant count default to 0
    data.participantCount = 0;

    try {
      // Send data to the server
      const response = await axios.post("https://b10a12-server-side-developer-jaber.vercel.app/madical_camp", data);
      if (response.status === 201) {
        toast.success("Camp added successfully!");
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add the camp. Please try again!");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl">
        <h2 className="mb-6 font-bold text-[#1A8A83] text-3xl text-center">Add A New Camp</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Camp Name */}
          <div>
            <label className="block mb-1 font-medium">Camp Name</label>
            <input
              type="text"
              {...register("name", { required: "Camp name is required" })}
              className="input-bordered w-full input"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="url"
              {...register("image", { required: "Image URL is required" })}
              className="input-bordered w-full input"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>

          {/* Camp Fees */}
          <div>
            <label className="block mb-1 font-medium">Camp Fees (USD)</label>
            <input
              type="text"
              {...register("fees", {
                required: "Camp fees are required",
                min: { value: 0, message: "Fees cannot be negative" },
              })}
              className="input-bordered w-full input"
            />
            {errors.fees && <p className="text-red-500 text-sm">{errors.fees.message}</p>}
          </div>

          {/* Date & Time */}
          <div>
            <label className="block mb-1 font-medium">Date & Time</label>
            <input
              type="datetime-local"
              {...register("dateTime", { required: "Date and time are required" })}
              className="input-bordered w-full input"
            />
            {errors.dateTime && <p className="text-red-500 text-sm">{errors.dateTime.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="input-bordered w-full input"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          {/* Healthcare Professional Name */}
          <div>
            <label className="block mb-1 font-medium">Healthcare Professional Name</label>
            <input
              type="text"
              {...register("professional", { required: "Professional name is required" })}
              className="input-bordered w-full input"
            />
            {errors.professional && (
              <p className="text-red-500 text-sm">{errors.professional.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="textarea-bordered w-full textarea"
              rows="4"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="bg-[#42bb76] hover:bg-[#b8c7bf] w-full font-bold text-gray-200 hover:text-gray-600 text-xl btn">
              Add Camp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCamp;
