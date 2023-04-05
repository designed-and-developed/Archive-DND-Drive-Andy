import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { FindAllUserDocument } from "../generated/graphql";

const AllUsers = () => {
  const { loading, error, data } = useQuery(FindAllUserDocument);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data &&
        data.findAllUser.map((user: any) => (
          <li key={user.id}>
            {user.username} ({user.password})
          </li>
        ))}
    </div>
  );
};

export default AllUsers;
