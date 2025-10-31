const getData = async () => {
  const resp = await fetch("http://localhost:3000/my-route");
  return resp.json();
};

const Home = async () => {
  const data = await getData();

  return <div>{JSON.stringify(data, null)}</div>;
};

export default Home;
