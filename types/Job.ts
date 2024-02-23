export interface JobResponse {
    jobs: Job[]
}

export interface Job {
    id: number,
    url: string,
    jobTitle: string,
    companyName: string,
    companyLogo: string,
    jobIndustry: string,
    jobType: string
}

export interface JobRequest {
    url: string,
    jobTitle: string,
    companyName: string,
    companyLogo: string,
    jobIndustry: string,
    jobType: string
}