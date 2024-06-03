App Estácio Vagas

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://app-estacio-vagas.onrender.com/job/view-many');
                setJobs(response.data);
            } catch (error) {
                console.error(error); 
            }
        };

        fetchData();
    }, []);

    const renderJob = ({ item }) => (
        <View style={styles.jobItem}>
            <Text style={styles.role_job}>{item.role_job}</Text>
            <Text style={styles.jobCompany}>{item.company_job}</Text>
            {/* Add more job details as needed */}
        </View>
    );
