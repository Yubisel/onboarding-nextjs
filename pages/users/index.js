import AppLayout from "../../components/AppLayout";
import Image from "next/image";
import Router from "next/router";

const Users = ({ users }) => {
  console.log(users);
  return (
    <AppLayout>
      <div className="row">
        <div className="col-12">
          <h3 className="my-4">Users list</h3>

          <table className="table table-primary table-hover table-striped align-middle">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  #
                </th>
                <th scope="col">Avatar</th>
                <th scope="col">Full name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((oUser, nIndex) => (
                <tr
                  key={oUser.id}
                  role="button"
                  onClick={() =>
                    Router.push("/users/[id]", `/users/${oUser.id}`)
                  }
                >
                  <td className="text-center">{nIndex + 1}</td>
                  <td>
                    <Image
                      className="rounded-circle"
                      src={oUser.avatar}
                      alt={oUser.name + oUser.last_name}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td>
                    {oUser.first_name} {oUser.last_name}
                  </td>
                  <td>{oUser.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const oResponse = await fetch(`https://reqres.in/api/users`);
  const oResponseJSON = await oResponse.json();
  // Pass data to the page via props
  return { props: { users: oResponseJSON.data } };
}

export default Users;
