module.exports = {
    columns: {
        students: [
            { header: 'FirstName', key: 'FirstName' },
            { header: 'LastName', key: 'LastName' },
            { header: 'EmailAddress', key: 'EmailAddress' },
            { header: 'Section', key: 'SectionEnrolled' }
        ],
        others:[
            { header: 'FirstName', key: 'FirstName' },
            { header: 'LastName', key: 'LastName' },
            { header: 'EmailAddress', key: 'EmailAddress' },
            { header: 'NumberOfTickets', key: 'NumberOfTicketsperPerson' }
        ]
    },
    categories: ['students','others']
}