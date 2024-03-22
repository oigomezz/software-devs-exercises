import { SortBy, type User } from "../types.d";

interface Props {
  changeSorting: (sort: SortBy) => void;
  deleteUser: (email: string) => void;
  showColors: boolean;
  users: User[];
}

export function UsersList({
  changeSorting,
  deleteUser,
  showColors,
  users,
}: Readonly<Props>) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Foto</th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.NAME);
            }}
          >
            Nombre
          </th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.LAST);
            }}
          >
            Apellido
          </th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.COUNTRY);
            }}
          >
            Pais
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className={showColors ? "table--showColors" : ""}>
        {users.map((user, index: number) => {
          return (
            <tr key={index}>
              <td>
                <img
                  src={user.picture.thumbnail}
                  alt={`Perfil de ${user.name.first}`}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(user.email);
                  }}
                >
                  Borrar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
