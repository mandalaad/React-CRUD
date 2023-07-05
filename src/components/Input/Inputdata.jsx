import React, { useEffect, useState } from 'react'
import './inputstyle.css'
import axios from 'axios';
import { Button, Modal, ToastContainer } from 'react-bootstrap';
import { red } from '@mui/material/colors';
function Inputdata() {
    // input file
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
    const file = event.target.files[0];
        // Memeriksa tipe file
      if (file && file.type !== 'image/jpeg') {
        alert('Mohon pilih file dengan format JPG!');
        return;
      }
  
      // Memeriksa ukuran file
      if (file && file.size > 0.1 * 1024 * 1024) {
        alert('Ukuran file melebihi batas 100kb!');
        return;
      }
        setSelectedFile(file);
    };

    // react-datepicker


    // data grade otomatis 
    const [nama, setNama] = useState('');
    const [hargabeli, setHargabeli] = useState('');
    
    const [hargajual, setHargajual] = useState('');
    const [stok, setStok] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Membuat objek data untuk dikirim ke backend
      const data = {
        nama,
        // tanggal: selectedDate ? selectedDate.toISOString() : '',
        hargajual,
        hargabeli,
        stok,
      };
      
      if (!isDataSubmitted) {
        setIsSubmitting(true);
      try {
        await axios.post('https://648805000e2469c038fcc87f.mockapi.io/historypemasukanadmin/api/v1/inputan', data);
        setModalMessage('Data berhasil ditambahkan ke database.');
        setShowModal(true);

        console.log('Data berhasil ditambahkan ke database!');
        
        setNama('');
        setHargabeli('')
        setHargajual('')
        setStok('')

        setIsDataSubmitted(true);

        setTimeout(() => {
          setIsDataSubmitted(false);
        }, 10 * 1000); // Jeda 10 menit (10 * 60 * 1000 ms)
        // Setelah data berhasil ditambahkan ke database, lakukan penanganan sesuai kebutuhan (misalnya notifikasi, refresh data, dll)

        // Mengambil data terbaru setelah ditambahkan
      } catch (error) {
        console.error(error);
        setModalMessage('Data gagal ditambahkan ke database.');
        setShowModal(true);
      }finally {
        setIsSubmitting(false);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className='content'>
        <div className='wrap'>
        <div className="inputdata">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <p>Nama Barang</p>
                    <input 
                    name='name'
                    value={nama} 
                    onChange={e => setNama(e.target.value)}
                    type="text" 
                    required
                    />
                </div>
                <div className="field">
                    <p>Harga Beli</p>
                    <input 
                    name="hargabeli"
                    type="number" 
                    value={hargabeli}
                    min={0}
                    onChange={e => setHargabeli(e.target.value)}
                    required
                    />
                </div>
                <div className="field">
                    <p>Harga Jual</p>
                    <input 
                    type="number" 
                    name="hargajual"
                    min={0}
                    value={hargajual}
                    onChange={e => setHargajual(e.target.value)}
                    required
                    />
                </div>
                <div className="field">
                    <p>Jumlah Stok</p>
                    <input 
                    type="number" 
                    name="stok"
                    min={0}
                    value={stok}
                    onChange={e => setStok(e.target.value)}
                    required
                    />
                </div>

                <div className="field">
                    <p>Foto Barang</p>
                    <input 
                    className='foto'
                    type="file" 
                    name='file'
                    onChange={handleFileChange} />
                </div>

                <div className="button">
                    <button type='submit' disabled={isSubmitting || isDataSubmitted}>Submit</button>
                    {isSubmitting ? 'Submitting...' : ''}
                </div>
            </form>
            {isDataSubmitted && <p style={{color:"red"}}>Anda telah berhasil mengirimkan data. Mohon tunggu selama 10 detik sebelum mengirimkan data kembali.</p>}
            
            <Modal show={showModal} onHide={closeModal}
              centered
              >
              <Modal.Header closeButton>
                <Modal.Title>Status</Modal.Title>
              </Modal.Header>
              <Modal.Body>{modalMessage}
              
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <ToastContainer />

        </div>
        </div>
    </div>
  )
}

export default Inputdata