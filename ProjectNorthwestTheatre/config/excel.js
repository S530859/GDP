module.exports = {
    columns: {
        students: [
            {
                header: 'FirstName',
                key: 'FirstName',
                width: 30
            },
            {
                header: 'LastName',
                key: 'LastName',
                width: 30
            },
            {
                header: 'EmailAddress',
                key: 'EmailAddress',
                width: 40
            },
            {
                header: 'Section',
                key: 'SectionEnrolled'
            }
        ],
        others: [
            {
                header: 'FirstName',
                key: 'FirstName',
                width: 30
            },
            {
                header: 'LastName',
                key: 'LastName',
                width: 30
            },
            {
                header: 'EmailAddress',
                key: 'EmailAddress',
                width: 40
            },
            {
                header: 'NumberOfTickets',
                key: 'NumberOfTicketsperPerson'
            }
        ]
    },
    categories: ['students', 'others']
}