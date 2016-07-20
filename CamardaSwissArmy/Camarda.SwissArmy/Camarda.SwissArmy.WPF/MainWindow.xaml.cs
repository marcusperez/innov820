using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Camarda.SwissArmy.WPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void btnCombineMorningStarPDFs_Click(object sender, RoutedEventArgs e)
        {
            core.combinePDFs(@"E:\OneDrive\innov820\camarda\TestPages\SourceDirectory", @"E:\OneDrive\innov820\camarda\TestPages\OutputDirectory");


        }
    }
}
