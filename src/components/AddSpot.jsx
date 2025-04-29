import { Container } from "react-bootstrap";
import { addnewLineApi } from "../features/ParkingLineAxios";
import useForm from "../hooks/useForm";


const AddSpot = () => {
  const { form, setForm, handleOnChange } = useForm({
    name: "",
    startLat: "",
    startLng: "",
    endLat: "",
    endLng: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, startLat, startLng, endLat, endLng } = form;

    if (!name || !startLat || !startLng || !endLat || !endLng) {
      alert("Please fill in all fields.");
      return;
    }

    const payload = {
      name,
      line: [
        { lat: parseFloat(startLat), lng: parseFloat(startLng) },
        { lat: parseFloat(endLat), lng: parseFloat(endLng) },
      ],
    };

    try {
      const result = await addnewLineApi(payload);
      result.status === "success" &&
        setForm({
          name: "",
          startLat: "",
          startLng: "",
          endLat: "",
          endLng: "",
        }); 
    } catch (error) {
      console.error(error);
      alert("Failed to add spot.");
    }
  };

  return (
    <Container>
      <p>
        Help others find free parking by adding a spot to our database. Your
        submission will be reviewed by our team.
      </p>
      <form onSubmit={handleSubmit}>
        <div >
          <label>Street full address:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleOnChange}
            required
          />
        </div>

        <div>
          <h4>Start Coordinates:</h4>
          <input
            type="number"
            step="any"
            name="startLat"
            value={form.startLat}
            onChange={handleOnChange}
            placeholder="Start Latitude"
            required
          />
          <input
            type="number"
            step="any"
            name="startLng"
            value={form.startLng}
            onChange={handleOnChange}
            placeholder="Start Longitude"
            required
          />
        </div>

        <div>
          <h4>End Coordinates:</h4>
          <input
            type="number"
            step="any"
            name="endLat"
            value={form.endLat}
            onChange={handleOnChange}
            placeholder="End Latitude"
            required
          />
          <input
            type="number"
            step="any"
            name="endLng"
            value={form.endLng}
            onChange={handleOnChange}
            placeholder="End Longitude"
            required
          />
        </div>

        <button type="submit">Submit Spot</button>
      </form>
    </Container>
  );
};

export default AddSpot;
