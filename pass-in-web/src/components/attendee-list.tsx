import {Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight} from "lucide-react";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/pt'
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { ChangeEvent, useState } from "react";
import { attendees } from "../data/attendees";

dayjs.extend(relativeTime)
dayjs.locale('pt')

export function AttendeeList() {
  
  const [page, setPage] = useState(1)

  const [search, setSearch] = useState('')

  const totalPages = Math.ceil(attendees.length / 10)

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>){
    setSearch(event.target.value)
  }

  function goToFirstPage() {
    setPage(1)
  }
  function goTolastPage(){
    setPage(totalPages)
  }
  function goTopreviousPage(){
    setPage(page - 1)
  }
  function goTonextPage(){
    setPage(page + 1)
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold">Partipantes</h1>
          <div className="px-3 py-1.5 w-72 border border-white/10 rounded-lg text-sm flex items-center gap-3">
            <Search className="size-4 text-emerald-300" />
            <input
              className="bg-transparent flex-1 outline-none border-0 p-0 text-sm "
              type="text"
              placeholder="Buscar participantes..."
              onChange={onSearchInputChanged}
            />
          </div>

          {search}
          
        </div>

        <Table>
          <thead>
            <tr className="border-b border-white/10">
              <TableHeader style={{ width: 48 }} className="px-4">
                <input
                  className="size-4 bg-black/20 rounded border border-white/10"
                  type="checkbox"
                />
              </TableHeader>
              <TableHeader>Codigo</TableHeader>
              <TableHeader>Participantes</TableHeader>
              <TableHeader>Data de inscricao</TableHeader>
              <TableHeader>Data do check-in</TableHeader>
              <TableHeader style={{ width: 64 }}></TableHeader>
            </tr>
          </thead>
          <tbody>
            {/* 
                ele vai comecar do registo 0 
            */}
            {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
              return (
                <tr
                  key={attendee.id}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <TableCell>
                    <input
                      className="size-4 bg-black/20 rounded border border-white/10"
                      type="checkbox"
                    />
                  </TableCell>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        {attendee.name}
                      </span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                  <TableCell>{dayjs().to(attendee.CheckedIndAt)}</TableCell>
                  <TableCell>
                    <IconButton transparent={true}>
                      <MoreHorizontal className="size-4" />
                    </IconButton>
                  </TableCell>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <TableCell colSpan={3}>Mostrando 10 de {attendees.length}</TableCell>
              <TableCell className="text-right" colSpan={3}>
                <div className="inline-flex items-center gap-3">
                  <span>Pagina {page} de {totalPages}</span>
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goTopreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goTonextPage}disabled={page === totalPages}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goTolastPage} disabled={page === totalPages}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </TableCell>
            </tr>
          </tfoot>
        </Table>
      </div>
    </>
  );
}
