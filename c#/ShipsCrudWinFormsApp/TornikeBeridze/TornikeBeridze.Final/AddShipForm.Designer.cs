namespace TornikeBeridze.Final
{
    partial class AddShipForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            modelTextBox = new TextBox();
            modelLabel = new Label();
            speedLabel = new Label();
            speedTextBox = new TextBox();
            releaseYearLabel = new Label();
            releaseYearTextBox = new TextBox();
            weightLabel = new Label();
            weightTextbox = new TextBox();
            saveBtn = new Button();
            SuspendLayout();
            // 
            // modelTextBox
            // 
            modelTextBox.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            modelTextBox.Location = new Point(391, 84);
            modelTextBox.Name = "modelTextBox";
            modelTextBox.Size = new Size(171, 34);
            modelTextBox.TabIndex = 0;
            // 
            // modelLabel
            // 
            modelLabel.AutoSize = true;
            modelLabel.Font = new Font("Segoe UI", 13.8F, FontStyle.Regular, GraphicsUnit.Point, 0);
            modelLabel.Location = new Point(222, 84);
            modelLabel.Name = "modelLabel";
            modelLabel.Size = new Size(85, 31);
            modelLabel.TabIndex = 0;
            modelLabel.Text = "Model:";
            // 
            // speedLabel
            // 
            speedLabel.AutoSize = true;
            speedLabel.Font = new Font("Segoe UI", 13.8F, FontStyle.Regular, GraphicsUnit.Point, 0);
            speedLabel.Location = new Point(222, 208);
            speedLabel.Name = "speedLabel";
            speedLabel.Size = new Size(83, 31);
            speedLabel.TabIndex = 0;
            speedLabel.Text = "Speed:";
            // 
            // speedTextBox
            // 
            speedTextBox.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            speedTextBox.Location = new Point(391, 207);
            speedTextBox.Name = "speedTextBox";
            speedTextBox.Size = new Size(171, 34);
            speedTextBox.TabIndex = 2;
            // 
            // releaseYearLabel
            // 
            releaseYearLabel.AutoSize = true;
            releaseYearLabel.Font = new Font("Segoe UI", 13.8F, FontStyle.Regular, GraphicsUnit.Point, 0);
            releaseYearLabel.Location = new Point(222, 150);
            releaseYearLabel.Name = "releaseYearLabel";
            releaseYearLabel.Size = new Size(145, 31);
            releaseYearLabel.TabIndex = 0;
            releaseYearLabel.Text = "Release Year:";
            // 
            // releaseYearTextBox
            // 
            releaseYearTextBox.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            releaseYearTextBox.Location = new Point(391, 147);
            releaseYearTextBox.Name = "releaseYearTextBox";
            releaseYearTextBox.Size = new Size(171, 34);
            releaseYearTextBox.TabIndex = 1;
            // 
            // weightLabel
            // 
            weightLabel.AutoSize = true;
            weightLabel.Font = new Font("Segoe UI", 13.8F, FontStyle.Regular, GraphicsUnit.Point, 0);
            weightLabel.Location = new Point(222, 270);
            weightLabel.Name = "weightLabel";
            weightLabel.Size = new Size(92, 31);
            weightLabel.TabIndex = 0;
            weightLabel.Text = "Weight:";
            // 
            // weightTextbox
            // 
            weightTextbox.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            weightTextbox.Location = new Point(391, 267);
            weightTextbox.Name = "weightTextbox";
            weightTextbox.Size = new Size(171, 34);
            weightTextbox.TabIndex = 3;
            // 
            // saveBtn
            // 
            saveBtn.Location = new Point(391, 350);
            saveBtn.Name = "saveBtn";
            saveBtn.Size = new Size(147, 47);
            saveBtn.TabIndex = 4;
            saveBtn.Text = "Save";
            saveBtn.UseVisualStyleBackColor = true;
            saveBtn.Click += saveBtn_Click;
            // 
            // AddShipForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(saveBtn);
            Controls.Add(weightLabel);
            Controls.Add(weightTextbox);
            Controls.Add(releaseYearLabel);
            Controls.Add(releaseYearTextBox);
            Controls.Add(speedLabel);
            Controls.Add(speedTextBox);
            Controls.Add(modelLabel);
            Controls.Add(modelTextBox);
            Name = "AddShipForm";
            Text = "AddShipForm";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox modelTextBox;
        private Label modelLabel;
        private Label speedLabel;
        private TextBox speedTextBox;
        private Label releaseYearLabel;
        private TextBox releaseYearTextBox;
        private Label weightLabel;
        private TextBox weightTextbox;
        private Button saveBtn;
    }
}