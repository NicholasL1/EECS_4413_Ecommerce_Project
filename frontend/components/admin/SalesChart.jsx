import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faChevronCircleLeft, faChevronCircleRight, faCoins, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

// Dynamically import ReactApexChart to ensure it's only loaded on the client side
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SalesChart({ dates }) {
    const MAX_YEAR = parseInt(new Date().getFullYear());
    const MIN_YEAR = 2020;
    const [selectedYear, setSelectedYear] = useState(MAX_YEAR);
    const [viewOption, setViewOption] = useState('qty_sold');

    // Button styles
    const yearBtnStyle = 'w-[128px] p-1 font-medium text-md shadow-md rounded-md border border-custom-black hover:bg-custom-black hover:text-white active:scale-95';
    const yearBtnDisabled = 'disabled:bg-gray-300 cursor-default text-white border-none hover:bg-gray-300';

    const handleSwitchView = () => {
        setViewOption(viewOption === 'qty_sold' ? 'profit' : 'qty_sold');
    };

    const formatViewOptionLbl = () => {
        return viewOption.split('_').map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' ');
    };

    const handleViewLabel = () => {
        return viewOption === 'qty_sold' ? 'Profit' : 'Qty Sold';
    };

    const handleSwitchYear = (value) => {
        const newYear = selectedYear + value;
        if (newYear > MAX_YEAR || newYear < MIN_YEAR) return;
        setSelectedYear(newYear);
    };

    const data = {
        series: [
            {
                data: dates[selectedYear][viewOption] || [],
            }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    horizontal: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                title: {
                    text: 'Months'
                }
            },
            yaxis: {
                title: {
                    text: formatViewOptionLbl().split(' ')[0]
                }
            },
            title: {
                text: `${formatViewOptionLbl()} in ${selectedYear}`,
                align: 'center',
                style: {
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#263238'
                }
            }
        }
    };

    return (
        <div>
            <div id="chart" className='my-8 border border-cutom-black p-3 rounded-md'>
                <ReactApexChart options={data.options} series={data.series} type="bar" height={350} />
                
                <div className='flex flex-row my-4'>
                    <div className='w-1/3'>
                        <button onClick={handleSwitchView} className='flex flex-row justify-center items-center gap-2 underline p-2'>
                            <FontAwesomeIcon icon={handleViewLabel() === 'Profit' ? faCoins : faArrowTrendUp} />
                            <span>View {handleViewLabel()}</span>
                        </button>
                    </div>

                    <div id='switcher' className='w-1/3 flex flex-row gap-2 justify-center align-middle'>
                        <button onClick={() => handleSwitchYear(-1)} className={`${yearBtnStyle} ${selectedYear === MIN_YEAR ? yearBtnDisabled : ''}`}>
                            <FontAwesomeIcon icon={faChevronCircleLeft} className='mr-1' />Prev. Year
                        </button>
                        <button onClick={() => handleSwitchYear(1)} className={`${yearBtnStyle} ${selectedYear === MAX_YEAR ? yearBtnDisabled : ''}`}>
                            Next Year<FontAwesomeIcon icon={faChevronCircleRight} className='ml-1' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
