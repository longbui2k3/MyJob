import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Heading5 } from "../../headings";
import { ButtonSolid_2 } from "../../buttons";
import AppliedJobInfo from "./AppliedJobInfo";

export default function AppliedJobs() {
  return (
    <>
      <div className="flex space-x-2 mb-3">
        <Heading5 name="Applied Jobs"></Heading5>
        <div className="font-normal text-xl text-gray-500">(100)</div>
      </div>
      <div>
        <TableContainer>
          <Table variant="simple">
            <Thead color={"var(--gray-500)"}>
              <Tr>
                <Th>JOBS</Th>
                <Th>DATE APPLIED</Th>
                <Th>STATUS</Th>
                <Th>ACTION</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <AppliedJobInfo />
                </Td>
                <Td>{Date.now()}</Td>
                <Td>Active</Td>
                <Td>
                  <ButtonSolid_2 children={"View Details"} />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
