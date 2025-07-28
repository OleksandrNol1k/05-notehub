import css from "./App.module.css"
import { useState } from "react"
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useDebouncedCallback } from "use-debounce"
import { fetchNotes } from "../../services/noteService."
import Modal from "../Modal/Modal"
import NoteForm from "../NoteForm/NoteForm"
import NoteList from "../NoteList/NoteList"
import Pagination from "../Pagination/Pagination"
import SearchBox from "../SearchBox/SearchBox" 

export default function App() { 
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const updateSearchQuery = useDebouncedCallback((value: string) => {
        setQuery(value);
        setPage(1);
    }, 300);
    
    const [inputValue, setInputValue] = useState("");
    const handleSearchChange = (value: string) => {
        setInputValue(value);
        updateSearchQuery(value);
    }
    
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["notes", query, page],
        queryFn: () => fetchNotes(query, page),
        placeholderData: keepPreviousData,
    })

    const totalPages = data?.totalPages ?? 0;

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={inputValue} onSearch={handleSearchChange} />
                {totalPages > 1 && <Pagination total={totalPages} page={page} onChange={setPage} />}
                <button className={css.button} onClick={openModal}>Create note +</button>
            </header>
            {isLoading && <strong className={css.loading}>Loading notes, please wait...</strong>}
            {isError && <strong className={css.error}>There was an error, please try again...</strong>}
            {isSuccess && <NoteList notes={data.notes} />}
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <NoteForm onCloseModal={closeModal} />
                </Modal>
            )}
        </div>
    );
}