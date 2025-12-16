// Definisi karakter yang mungkin
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

// Ambil elemen HTML
const panjangInput = document.getElementById('panjang');
const panjangValueSpan = document.getElementById('panjang-value');
const hurufBesarCheckbox = document.getElementById('huruf_besar');
const angkaCheckbox = document.getElementById('angka');
const simbolCheckbox = document.getElementById('simbol');
const passwordOutput = document.getElementById('password-output');
const generateBtn = document.getElementById('generate-btn');

// Update nilai panjang password saat slider digeser
panjangInput.addEventListener('input', () => {
    panjangValueSpan.textContent = panjangInput.value;
});

// Fungsi utama untuk generate password
function generatePassword() {
    let charset = ""; // Kumpulan karakter yang akan digunakan
    let password = "";
    const passwordLength = parseInt(panjangInput.value);

    // Menentukan karakter berdasarkan checkbox yang dicentang
    if (hurufBesarCheckbox.checked) {
        charset += upperCase;
    }
    // Huruf kecil selalu disertakan secara default (untuk keamanan)
    charset += lowerCase; 

    if (angkaCheckbox.checked) {
        charset += numbers;
    }
    if (simbolCheckbox.checked) {
        charset += symbols;
    }

    // Peringatan jika tidak ada kriteria yang dipilih (meskipun lowerCase sudah default)
    if (charset.length === 0) {
        passwordOutput.textContent = "Pilih minimal satu kriteria!";
        return;
    }

    // Loop untuk memilih karakter secara acak
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    passwordOutput.textContent = password;
}

// Fungsi untuk menyalin password
function copyPassword() {
    // Ambil teks dari output
    const passwordText = passwordOutput.textContent;
    
    // Pastikan itu adalah password, bukan pesan error
    if (passwordText === "Klik tombol Generate..." || passwordText.includes("kriteria")) {
        alert("Generate password dulu, Bang!");
        return;
    }
    
    // API Clipboard modern
    navigator.clipboard.writeText(passwordText).then(() => {
        alert("Password berhasil disalin ke clipboard!");
    }).catch(err => {
        // Fallback jika browser tidak mendukung
        console.error('Gagal menyalin: ', err);
    });
}

// Tambahkan event listener ke tombol Generate
generateBtn.addEventListener('click', generatePassword);

// (Opsional) Generate password saat halaman pertama kali dimuat
generatePassword();