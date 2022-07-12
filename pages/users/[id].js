import AppLayout from "../../components/AppLayout";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const UserDetails = ({ user: oUser }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppLayout>
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h3 className="my-4">User details</h3>
          <Link href="/users">
            <a className="btn btn-primary">back</a>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card bg-primary text-white">
            <div
              className={"d-flex justify-content-center align-items-center p-4"}
            >
              <Image
                className="rounded-circle"
                src={oUser.avatar}
                alt={oUser.name + oUser.last_name}
                width={150}
                height={150}
              />
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item list-group-item-action bg-primary text-white">
                <label className="me-3">First name:</label>
                {oUser.first_name}
              </li>
              <li className="list-group-item list-group-item-action bg-primary text-white">
                <label className="me-3">Last name:</label>
                {oUser.last_name}
              </li>
              <li className="list-group-item list-group-item-action bg-primary text-white">
                <label className="me-3">Email:</label>
                {oUser.email}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

// This gets called on every request
export async function getServerSideProps(ctx) {
  // Fetch data from external API
  const oResponse = await fetch(`https://reqres.in/api/users/${ctx.query.id}`);
  const oResponseJSON = await oResponse.json();
  // Pass data to the page via props
  return { props: { user: oResponseJSON.data } };
}

export default UserDetails;
