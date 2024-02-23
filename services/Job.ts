import axios, { AxiosError } from 'axios'
import { JobResponse } from '../types/Job'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_JOBICY_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

const getJobList = async () => {
    const endpoint = `/api/v2/remote-jobs`
    const response = await api.get<JobResponse>(endpoint)
    return response
}

const JobService = {
    getJobList
}

export default JobService
