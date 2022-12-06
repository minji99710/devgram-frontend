import React, { useState } from "react";
import { useEditCategoryData } from "@hooks/useCategoriesData";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { TextInput } from "@style";

function EditableRow({ data, columns, handleEditClick }) {
    const { mutate } = useEditCategoryData();
    const [editedData, setEditedData] = useState({
        id: data.id,
        name: data.name || "",
        color: data.color || "",
    });
    console.log("editedData: ", editedData);
    const getInputData = (e) => {
        const newData = { ...editedData };
        newData[e.target.id] = e.target.value;
        setEditedData(newData);
    };

    const handleEdit = () => {
        mutate({ id: editedData.id, editedData: editedData });
        handleEditClick(-1);
    };

    const handleCancel = () => {
        handleEditClick(-1);
    };

    return (
        <tr>
            {columns.map((col, index) => (
                <td key={index}>
                    <TextInput
                        type="text"
                        id={col.field}
                        name={col.header}
                        placeholder={`${col.header} 입력`}
                        onChange={(e) => getInputData(e)}
                        value={editedData[col.field]}
                    />
                </td>
            ))}
            <td>
                <button
                    type="button"
                    className="btn btn-squre btn-xs btn-outline"
                    onClick={handleEdit}
                >
                    <CheckIcon className="w-5 h-5" />
                </button>
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-squre btn-xs"
                    onClick={handleCancel}
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </td>
        </tr>
    );
}

export default EditableRow;
