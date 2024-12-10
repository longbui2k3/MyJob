import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Heading5 } from "../headings";

export default function DashboardUsers() {
  return (
    <>
      <div className="flex justify-between">
        <Heading5 name="Users" />
      </div>
      <div className="mt-6 space-y-1">
        <TableContainer>
          <Table variant="simple">
            <Thead color={"var(--gray-500)"}>
              <Tr>
                <Th w={"40%"}>USER</Th>
                <Th w={"20%"}>IMAGE</Th>
                <Th w={"20%"}>OPEN POSITIONS</Th>
                <Th w={"20%"}> ACTIONS</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
