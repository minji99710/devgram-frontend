import React, { useState } from "react";
import AddModal from "@components/Admin/AddModal";
import Pagination from "@components/Admin/Pagination";
import EditableTable from "@components/Admin/EditableTable";
import SearchBar from "@components/Admin/SearchBar";
import { SearchContainer } from "@style";
import AddButton from "@components/Admin/AddButton";
import Table from "@components/Admin/Table";
import Tabs from "@components/Admin/Tabs";

function AdminManage({
    title,
    columns,
    useData,
    useAddData,
    useEditData,
    useDeleteData,
    hasAddButton = true,
    isEditable = true,
    toggledTab,
    setToggledTab,
}) {
    const [query, setQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const engPattern = /[a-zA-Z]/;
    const korPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const { data, isLoading, error } = useData();

    if (isLoading) return <h2>Loading...</h2>; // skeleton으로 변경
    if (error) return <h2>{error.message}</h2>;

    const filterComponent = (data) => {
        data = data?.filter((row) => {
            if (query === "") {
                return row;
            }

            if (
                korPattern.test(query) &&
                columns.some((col) => row[col.field].includes(query))
            ) {
                return row;
            }

            if (
                engPattern.test(query) &&
                columns.some((col) =>
                    row[col.field].toLowerCase().includes(query.toLowerCase())
                )
            ) {
                return row;
            }
        });
        return data;
    };

    const currentData = filterComponent(data).slice(firstIndex, lastIndex);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">{title} 관리</h1>
            {!hasAddButton && (
                <Tabs toggledTab={toggledTab} setToggledTab={setToggledTab} />
            )}
            <SearchContainer>
                {/* 서치바 */}
                <SearchBar setQuery={setQuery} />
                {/* 추가 버튼 */}
                {hasAddButton && <AddButton setShowModal={setShowModal} />}
            </SearchContainer>
            {/* 테이블 */}
            {isEditable ? (
                <form className="overflow-auto">
                    <EditableTable
                        currentData={currentData}
                        columns={columns}
                        useEditData={useEditData}
                        useDeleteData={useDeleteData}
                    />
                </form>
            ) : (
                <div className="overflow-auto sm:overflow-visible">
                    <Table
                        currentData={currentData}
                        columns={columns}
                        toggledTab={toggledTab}
                    />
                </div>
            )}
            {console.log("toggledtab in AdminManage: ", toggledTab)}
            <Pagination
                totalPosts={data.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            {hasAddButton && (
                <AddModal
                    visible={showModal}
                    onClose={() => setShowModal(false)}
                    columns={columns}
                    useAddData={useAddData}
                />
            )}
        </div>
    );
}

export default AdminManage;