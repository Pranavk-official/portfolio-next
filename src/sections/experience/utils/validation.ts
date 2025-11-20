import { WorkExperience } from '../config/workExperience';

/**
 * Validates a work experience entry to ensure all required fields are present and properly formatted
 * @param exp - Work experience object to validate
 * @returns true if valid, false otherwise
 */
export function validateWorkExperience(exp: WorkExperience): boolean {
    // Check required fields
    const requiredFields: (keyof WorkExperience)[] = [
        'id',
        'company',
        'location',
        'position',
        'employmentType',
        'startDate',
        'endDate',
        'achievements',
        'technologies'
    ];

    // Verify all required fields exist and are not empty
    for (const field of requiredFields) {
        const value = exp[field];

        if (value === undefined || value === null) {
            console.error(`Validation failed for ${exp.id || 'unknown'}: Missing required field "${field}"`);
            return false;
        }

        // Check string fields are not empty
        if (typeof value === 'string' && value.trim() === '') {
            console.error(`Validation failed for ${exp.id}: Field "${field}" is empty`);
            return false;
        }

        // Check array fields are not empty
        if (Array.isArray(value) && value.length === 0) {
            console.error(`Validation failed for ${exp.id}: Field "${field}" array is empty`);
            return false;
        }
    }

    // Validate date format (YYYY-MM)
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])$/;

    if (!dateRegex.test(exp.startDate)) {
        console.error(`Validation failed for ${exp.id}: Invalid startDate format "${exp.startDate}". Expected format: YYYY-MM`);
        return false;
    }

    if (exp.endDate !== 'Present' && !dateRegex.test(exp.endDate)) {
        console.error(`Validation failed for ${exp.id}: Invalid endDate format "${exp.endDate}". Expected format: YYYY-MM or "Present"`);
        return false;
    }

    // Validate employment type
    const validEmploymentTypes: WorkExperience['employmentType'][] = [
        'Full-time',
        'Part-time',
        'Internship',
        'Contract'
    ];

    if (!validEmploymentTypes.includes(exp.employmentType)) {
        console.error(`Validation failed for ${exp.id}: Invalid employmentType "${exp.employmentType}"`);
        return false;
    }

    // Validate start date is before end date (if not Present)
    if (exp.endDate !== 'Present') {
        const [startYear, startMonth] = exp.startDate.split('-').map(Number);
        const [endYear, endMonth] = exp.endDate.split('-').map(Number);

        const startTimestamp = startYear * 12 + startMonth;
        const endTimestamp = endYear * 12 + endMonth;

        if (startTimestamp > endTimestamp) {
            console.error(`Validation failed for ${exp.id}: startDate is after endDate`);
            return false;
        }
    }

    return true;
}

/**
 * Validates an array of work experiences and returns only valid entries
 * @param experiences - Array of work experience objects
 * @returns Array of valid work experiences
 */
export function validateWorkExperiences(experiences: WorkExperience[]): WorkExperience[] {
    return experiences.filter(exp => {
        const isValid = validateWorkExperience(exp);
        if (!isValid) {
            console.warn(`Skipping invalid work experience entry: ${exp.id || 'unknown'}`);
        }
        return isValid;
    });
}
