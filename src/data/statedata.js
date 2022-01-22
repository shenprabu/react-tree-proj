const treedata =
    {
        data:
        [
            {
                id: 1,
                name: 'Participant',    // filter category
                level: 0,
                checked: false,
                options: [
                    {
                        id: 1,
                        name: 'Name',
                        level: 1,
                        checked: false,
                        order: 1
                    },
                    {
                        id: 2,
                        name: 'Language',
                        level: 1,
                        checked: false,
                        order: 2
                    },
                    {
                        id: 3,
                        name: 'Country',
                        level: 1,
                        checked: false,
                        order: 3
                    }
                ]
            },

            {
                id: 2,
                name: 'Game of choice',
                level: 0,
                checked: false,
                options: [
                    {
                        id: 1,
                        name: 'Game name',
                        level: 1,
                        checked: false,
                        order: 1
                    },
                    {
                        id: 2,
                        name: 'Bought',
                        level: 1,
                        checked: false,
                        order: 2
                    }
                ]
            },

            {
                id: 3,
                name: 'Performance',
                level: 0,
                checked: false,
                options: [
                    {
                        id: 1,
                        name: 'Bank balance',
                        level: 1,
                        checked: false,
                        order: 1
                    },
                    {
                        id: 2,
                        name: 'Extra info 1',
                        level: 1,
                        checked: false,
                        order: 2
                    },
                    {
                        id: 3,
                        name: 'Extra info 2',
                        level: 1,
                        checked: false,
                        order: 3
                    }
                ]
            }
        ]
    }

const statedata = { treedata }

export default statedata