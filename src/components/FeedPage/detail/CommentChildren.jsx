import React, { useState } from "react";
import {
    useAddReportedCommentsData,
    useAddChildrenCommentsData,
} from "@hooks/useFeedData";

function CommentChildren({ comment }) {
    const [showInput, setShowInput] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commetInput, setCommentInput] = useState("");
    const [accuseReason, setAccuseReason] = useState("");

    const handleAccuseClick = (e) => {
        setAccuseReason(e.currentTarget.value);
    };

    const handleCommentClick = (e) => {
        setCommentInput(e.currentTarget.value);
    };

    const { mutate, isSuccess: isMutationDone } = useAddReportedCommentsData();
    const { mutate: addComment, isSuccess: isCommentMutationDone } =
        useAddChildrenCommentsData();

    const onReportSubmit = (e) => {
        e.preventDefault();

        const data = {
            id: comment.id,
            reason: accuseReason,
        };
        mutate({
            data: data,
        });
        setAccuseReason("");
    };

    const onCommentSubmit = (e) => {
        e.preventDefault();

        const data = {
            boardSeq: comment.boardSeq,
            content: commetInput,
            parentCommentSeq: comment.commentSeq,
            commentGroup: comment.commentGroup,
        };
        addComment({
            data: data,
        });
        setCommentInput("");
    };
    return (
        <div className="mb-5 ml-10" key={comment.commentSeq}>
            {/* 댓글작성자 + 댓글 내용 */}
            <div className="flex items-center mb-2">
                <img
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    className="mr-4 w-10 h-10 rounded-full self-start"
                />
                {/* 이미지 오른쪽 */}
                <div>
                    <p className="text-sm">
                        @
                        <span className="font-bold px-1">
                            {comment.parentCommentCreatedBy}
                        </span>
                    </p>
                    <p className="pb-2">{comment.content}</p>
                    {/* 댓글 남기기 */}
                    <button
                        className="text-sm font-bold mr-5"
                        onClick={() => setShowCommentInput((prev) => !prev)}
                    >
                        답글 달기
                    </button>

                    <button
                        className="text-sm font-bold"
                        onClick={() => {
                            setShowInput((prev) => !prev);
                        }}
                    >
                        신고
                    </button>
                    {showCommentInput && (
                        <form
                            onSubmit={onCommentSubmit}
                            className="flex items-center gap-3 py-2"
                        >
                            <textarea
                                className="min-w-[300px] rounded-lg border p-2"
                                onChange={handleCommentClick}
                                value={commetInput}
                                placeholder="댓글을 작성해주세요"
                            ></textarea>
                            <button className="btn">확인</button>
                        </form>
                    )}
                    {showInput && (
                        <form
                            onSubmit={onReportSubmit}
                            className="flex items-center gap-3 py-2"
                        >
                            <textarea
                                className="min-w-[300px] rounded-lg border p-2"
                                onChange={handleAccuseClick}
                                value={accuseReason}
                                placeholder="신고하고자 하는 이유를 작성해주세요"
                            ></textarea>
                            <button className="btn">확인</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommentChildren;