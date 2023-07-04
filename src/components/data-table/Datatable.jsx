import React, { useEffect, useState } from "react"
import { Modal, Table } from "react-bootstrap"
import './datatablestyle.css'
import axios from "axios"

function Datatable() {

  const [data, setData] = useState([]);

    useEffect(() => {
    // Fungsi untuk mendapatkan data dari API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://648805000e2469c038fcc87f.mockapi.io/historypemasukanadmin/api/v1/inputan');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const [nama, setNama] = useState('');
  const [hargabeli, setHargabeli] = useState('');
  
  const [hargajual, setHargajual] = useState('');
  const [stok, setStok] = useState('');
  const [status, setStatus] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://648805000e2469c038fcc87f.mockapi.io/historypemasukanadmin/api/v1/inputan');
      setData(response.data);
    } catch (error) {
      console.error('Gagal mendapatkan data dari server:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      tanggal : new Date().toLocaleDateString('en-US'),
      nama,
      hargabeli,
      hargajual,
      stok,
      
      status,
    };

    if (editIndex !== -1) {
      // Jika sedang dalam mode edit
      try {
        await axios.put(`https://648805000e2469c038fcc87f.mockapi.io/historypemasukanadmin/api/v1/inputan/${data[editIndex].id}`, newData);
        setAlertMessage('Data berhasil diperbarui.');
        setEditIndex(-1);
      } catch (error) {
        console.error('Gagal memperbarui data di server:', error);
        setAlertMessage('Gagal memperbarui data.');
      }
    } else {
      // Jika sedang dalam mode tambah data baru
      try {
        await axios.post('https://648805000e2469c038fcc87f.mockapi.io/historypemasukanadmin/api/v1/inputan', newData);
        setAlertMessage('Data berhasil disimpan.');
      } catch (error) {
        console.error('Gagal menyimpan data di server:', error);
        setAlertMessage('Gagal menyimpan data.');
      }
    }

    // Reset form setelah submit
    setNama('');
    setHargabeli('');
    setHargajual('');
    setStok('');
    setStatus('');

    fetchData(); // Memperbarui data setelah perubahan
  };

  const handleEdit = (index) => {
    const selectedData = data[index];
    setNama(selectedData.nama);
    setHargabeli(selectedData.hargabeli);
    setHargajual(selectedData.hargajual);
    setStok(selectedData.stok);
    setStatus(selectedData.status);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`https://648805000e2469c038fcc87f.mockapi.io/historypemasukanadmin/api/v1/inputan/${data[index].id}`);
      setAlertMessage('Data berhasil dihapus.');
      fetchData(); // Memperbarui data setelah penghapusan
    } catch (error) {
      console.error('Gagal menghapus data dari server:', error);
      setAlertMessage('Gagal menghapus data.');
    }
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setNama('');
    setHargabeli('');
    setHargajual('');
    setStok('');
    setStatus('');
    setAlertMessage('');
  };

  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
    <div className="content">
        <div className="wrap">
            <div className="tabel-income-admin">
                <h3>Data Masuk</h3>
                <div className="content1 mt-4">
                {alertMessage && <div>{alertMessage}</div>}
                    <div className="buton">
                    <button onClick={() => setShowModal(true)}>Masukan Data</button>
                    </div>
                    {/* <Button variant="primary" onClick={generateFakeData}>
                    Generate Fake Data
                    </Button> */}
                    <Modal
                    className="modal"
                    show={showModal} onHide={() => setShowModal(false)}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">{editIndex !== -1 ? 'Edit Data' : 'Tambah Data'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={handleSubmit}>
                    {/* <div className="field">
                            <p>Tanggal</p>
                            <div>
                                <DatePicker
                                formatdate='dd/MM/yyyy'
                                selected={selectedDate}
                                onChange={date => setSelectedDate(date)}
                                className='control'
                                name='tanggal'
                                required
                                />
                            </div>
                        </div> */}
                        <div className="field">
                        <p>Nama Barang</p>
                        <input
                        type="text"
                        placeholder="Nama"
                        value={nama} onChange={e => setNama(e.target.value)}
                        />
                        </div>
                        <div className="field">
                        <p>Harga Beli</p>
                        <input
                        type="number"
                        placeholder="input harga beli"
                        value={hargabeli} onChange={e => setHargabeli(e.target.value)}
                        />
                        </div>
                        <div className="field">
                        <p>Harga Jual</p>
                        <input
                        type="number"
                        placeholder="input harga jual"
                        value={hargajual} onChange={e => setHargajual(e.target.value)}
                        />
                        </div>
                        <div className="field">
                        <p>Stok</p>
                        <input
                        type="number"
                        placeholder="input jumlah stok"
                        value={stok} onChange={e => setStok(e.target.value)}
                        />
                        </div>
                        {/* <div className="field">
                        <p>Status</p>
                        <input
                        type="text"
                        placeholder="Status"
                        value={status} onChange={e => setStatus(e.target.value)}
                        />
                        </div> */}
                        <div className="buton-save">
                    <button type="submit">
                        {editIndex !== -1 ? 'Perbarui' : 'Simpan'}
                    </button>
                    {editIndex !== -1 && (
                        <button onClick={handleCancel}>
                        Batal
                        </button>
                    )}
                    </div>
                    </form>
                    </Modal.Body>
                    </Modal>
                </div>
                <div className="table-responsive">
                    <Table className="table table-bordered" id="dataTable" width="100%" cellspacing="0" >
                        <thead>
                            <tr>
                            <th>No</th>
                            <th>Nama Barang</th>
                            <th>Harga Beli</th>
                            <th>Harga Jual</th>
                            <th>Stok</th>
                            <th>Foto Barang</th>
                            <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                            <td>{item.id}</td>
                            {/* <td>{formatDate(item.tanggal)}</td> */}
                            <td>{item.nama}</td>
                            <td>{item.hargabeli}</td>
                            <td>{item.hargajual}</td>
                            <td>{item.stok}</td>
                            
                            <td></td>
                            <td>
                                <button className="buton-fungsi" type="button" onClick={() => handleEdit(index)}>Edit</button>
                                <button className="buton-fungsi" type="button" onClick={() => handleDelete(index)}>Hapus</button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Datatable