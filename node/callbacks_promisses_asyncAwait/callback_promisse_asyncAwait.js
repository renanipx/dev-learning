// async_demo.js

// ===========================
// Simulate fetching a user from a "database"
// ===========================

// 1️⃣ Callback
function getUserByIdCallback(id, callback) {
    setTimeout(() => {
        const user = { id, name: 'Renan' };
        if (!user) {    
            callback(new Error('User not found'));
        } else {
            callback(null, user);
        }
    }, 1000);
}

// 2️⃣ Promise
function getUserByIdPromise(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { id, name: 'Renan' };
            if (!user) {
                reject(new Error('User not found'));
            } else {
                resolve(user);
            }
        }, 1000);
    });
}

// 3️⃣ async/await
async function showUserAsync(id) {
    try {
        const user = await getUserByIdPromise(id);
        console.log('Async/Await User:', user);
    } catch (err) {
        console.error('Async/Await Error:', err);
    }
}

// ===========================
// Sequential calls demonstrating all three patterns
// ===========================

console.log('--- Callback ---');
getUserByIdCallback(1, (err, user) => {
    if (err) {
        console.error('Callback Error:', err);
        return;
    }
    console.log('Callback User:', user);

    console.log('--- Promise ---');
    getUserByIdPromise(2)
        .then(user => {
            console.log('Promise User:', user);

            console.log('--- Async/Await ---');
            showUserAsync(3);
        })
        .catch(err => console.error('Promise Error:', err));
});
