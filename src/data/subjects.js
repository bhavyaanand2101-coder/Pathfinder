export const SUBJECTS_DB = {
    btech: {
        1: [
            { 
                code:'CS101', name:'Engineering Mathematics I', credits:4, professor:'Dr. A. Sharma', 
                grade:72, attendance:80, assignments:8, totalAssign:10, 
                roadmap:[
                    {title:'Calculus Review', duration:'1 week', status:'done', desc:'Limits, derivatives, integrals'},
                    {title:'Linear Algebra', duration:'2 weeks', status:'active', desc:'Matrices, eigen values, RREF'}
                ], 
                recommendation:'Focus on Differential Equations—60% exam weight. Solve 2 past papers per week.' 
            },
            { 
                code:'CS102', name:'Programming in C', credits:4, professor:'Dr. B. Gupta', 
                grade:88, attendance:92, assignments:10, totalAssign:10, 
                roadmap:[
                    {title:'Pointers', duration:'1 week', status:'done', desc:'Pointer arithmetic, dynamic allocation'},
                ], 
                recommendation:'Excellent! Explore bit manipulation for competitive edge.' 
            }
        ],
        2: [
            // Paste Sem 2 data here...
        ]
    },
    mba: {
        1: [
            // Paste MBA Sem 1 data here...
        ]
    }
};