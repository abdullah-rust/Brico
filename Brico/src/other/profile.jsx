import Header from "../components/Header";

export default function Profile() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "100px", position: "absolute" }}>
        <h1>Profile</h1>
        <p>This is the profile page.</p>
      </div>
    </div>
  );
}
