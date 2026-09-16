import api from "../api/api";
import type { User } from "../types/usertype";

export const getBatchStudents = async (
    batchId: string
): Promise<User[]> => {
    const { data } = await api.get(
        `/batches/${batchId}/students`
    );

    return data.data;
};