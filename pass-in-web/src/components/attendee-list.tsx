import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { ChangeEvent, useEffect, useState } from "react";
// import { attendees } from "../data/attendees";

dayjs.extend(relativeTime);
dayjs.locale("pt");

interface Attendee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export function AttendeeList() {
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has('page')){
      return Number(url.searchParams.get('page'))
    }

    return 1
  });

  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has('search')){
      return url.searchParams.get('search') ?? ""
    }

    return ""
  });

  const [total, setTotal] = useState(0);
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));
    if (search.length > 0) {
      url.searchParams.set("query", search);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, search]);

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page)
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", String(search));

    window.history.pushState({}, "", url);

    setSearch(search)
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }
  function goTolastPage() {
    setCurrentPage(totalPages);
  }
  function goTopreviousPage() {
    setCurrentPage(page - 1);
  }
  function goTonextPage() {
    setCurrentPage(page + 1);

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
              value={search}
              placeholder="Buscar participantes..."
              onChange={onSearchInputChanged}
            />
          </div>
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
            {attendees.map((attendee) => {
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
                  <TableCell>
                    {attendee.checkedInAt === null ? (
                      <span className="text-zinc-500">Nao fez check-in</span>
                    ) : (
                      dayjs().to(attendee.checkedInAt)
                    )}
                  </TableCell>
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
              <TableCell colSpan={3}>
                Mostrando {attendees.length} de {total}
              </TableCell>
              <TableCell className="text-right" colSpan={3}>
                <div className="inline-flex items-center gap-3">
                  <span>
                    Pagina {page} de {totalPages}
                  </span>
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goTopreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goTonextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goTolastPage}
                    disabled={page === totalPages}
                  >
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
