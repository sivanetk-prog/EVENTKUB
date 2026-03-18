const API_BASE_URL = 'http://localhost:3070';

document.getElementById('login-form').addEventListener('submit', async (submit_event) => {
    submit_event.preventDefault();

    const user_email = document.getElementById('user_email').value.trim();
    const user_password = document.getElementById('user_password').value.trim();

    try {
        const login_response = await axios.post(`${API_BASE_URL}/auth/login`, {
            user_email,
            user_password
        });

        const { user_row } = login_response.data;

        localStorage.setItem('is_logged_in', 'true');
        localStorage.setItem('current_user_id', String(user_row.user_id));
        localStorage.setItem('current_user_name', user_row.user_name);
        localStorage.setItem('current_user_email', user_row.user_email);
        localStorage.setItem('current_user_role', user_row.user_role);

        await show_alert('เข้าสู่ระบบสำเร็จ!');
        window.location.href = 'index.html';
    } catch (request_error) {
        console.error(request_error);
        const error_message =
            request_error.response?.data?.message || 'ไม่สามารถเข้าสู่ระบบได้';
        alert(error_message);
    }
});
